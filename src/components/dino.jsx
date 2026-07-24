import { useEffect, useRef } from 'react';

/**
 * AutoRoamGame
 * A self-contained, auto-playing character shaped like the Claude Code icon,
 * roaming back and forth inside its own box. The body/head/ears stay
 * perfectly still (no whole-sprite scaling or bobbing). Only the four leg
 * tabs animate, alternating left/right, for a real walking stride. The
 * character walks to one edge, turns around, and walks back — forever.
 * No obstacles, no jumping, no scrolling ground.
 *
 * Usage:
 *   <AutoRoamGame />
 *   <AutoRoamGame height={56} />
 */

// Geometry below is taken directly from the Claude Code icon's SVG path
// (viewBox 0 0 24 24), decomposed into static parts (body/ears/neck/eyes)
// and four independently-animatable leg tabs.
const ICON = {
  w: 24,
  h: 15, // y spans 5..20 in source coords; we work in a 0..15 local space
  body: { x: 3, y: 0, w: 17.998, h: 9.05 }, // main head block (source y 5-14.05)
  earL: { x: 0, y: 5.95, w: 3, h: 3.1 },
  earR: { x: 21, y: 5.949, w: 3, h: 3.102 },
  neck: { x: 3, y: 9.05, w: 18, h: 3.029 }, // bridges body to legs
  eyeL: { x: 6, y: 3.102, w: 1.488, h: 2.847 },
  eyeR: { x: 16.51, y: 3.102, w: 1.49, h: 2.847 },
  legTop: 12.079, // where legs attach (neck bottom)
  legBaseH: 2.921, // full extended leg height
  legs: [
    { x: 4.487, w: 1.513, group: 'A' },
    { x: 7.488, w: 1.512, group: 'B' },
    { x: 15, w: 1.513, group: 'B' },
    { x: 18, w: 1.513, group: 'A' },
  ],
};

const AutoRoamGame = ({
  height = 56,
  runnerColor = '#D97757', // Claude clay
  groundColor = 'rgba(61,61,58,0.35)',
  stopChance = 0.006, // per-frame chance to randomly stop while walking
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let resizeObserver;

    let width = canvas.clientWidth;
    const groundY = height - 1; // ground flush with canvas bottom

    const charH = Math.round(height * 0.62);
    const scale = charH / ICON.h;
    const charW = ICON.w * scale;

    const margin = Math.max(4, height * 0.08);

    const runner = {
      x: margin,
      y: groundY - charH, // fixed vertical resting position
      dir: 1, // 1 = moving right, -1 = moving left
      paused: 0, // frames remaining in a pause
    };

    let speed = Math.max(1.2, height * 0.035);
    let runPhase = 0; // advances with distance traveled, drives the leg alternation

    const resize = () => {
      width = canvas.clientWidth;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.height = height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas.parentElement);
    }

    // Smooth 0..1 lift curve, no cusps (unlike abs(sin)), so motion eases
    // in and out rather than snapping direction.
    const liftCurve = (phase) => (1 - Math.cos(phase)) / 2;

    // Draws the icon at (leftX, topY) with fixed size charH, optionally
    // mirrored horizontally when walking left. Body/head/ears never move
    // or scale — only the legs shorten slightly (retract upward from a
    // fixed top) in an alternating A/B pattern while walking.
    const drawRunner = (leftX, topY, facing, walking) => {
      ctx.save();
      ctx.translate(leftX, topY);
      if (facing === -1) {
        ctx.translate(charW, 0);
        ctx.scale(-1, 1);
      }
      ctx.scale(scale, scale);

      ctx.fillStyle = runnerColor;
      ctx.fillRect(ICON.body.x, ICON.body.y, ICON.body.w, ICON.body.h);
      ctx.fillRect(ICON.earL.x, ICON.earL.y, ICON.earL.w, ICON.earL.h);
      ctx.fillRect(ICON.earR.x, ICON.earR.y, ICON.earR.w, ICON.earR.h);
      ctx.fillRect(ICON.neck.x, ICON.neck.y, ICON.neck.w, ICON.neck.h);

      let liftA = 0;
      let liftB = 0;
      if (walking) {
        const maxLift = ICON.legBaseH * 0.4;
        liftA = maxLift * liftCurve(runPhase);
        liftB = maxLift * liftCurve(runPhase + Math.PI);
      }

      ICON.legs.forEach((leg) => {
        const lift = leg.group === 'A' ? liftA : liftB;
        const h = ICON.legBaseH - lift;
        ctx.fillRect(leg.x, ICON.legTop, leg.w, h);
      });

      // Eye cutouts — punch real transparent holes so any page background
      // shows through correctly, regardless of theme.
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillRect(ICON.eyeL.x, ICON.eyeL.y, ICON.eyeL.w, ICON.eyeL.h);
      ctx.fillRect(ICON.eyeR.x, ICON.eyeR.y, ICON.eyeR.w, ICON.eyeR.h);
      ctx.globalCompositeOperation = 'source-over';

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = groundColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, groundY + 0.5);
      ctx.lineTo(width, groundY + 0.5);
      ctx.stroke();

      const walking = runner.paused <= 0;
      drawRunner(runner.x, runner.y, runner.dir, walking);
    };

    const update = () => {
      const minX = margin;
      const maxX = Math.max(minX, width - margin - charW);

      if (runner.paused > 0) {
        runner.paused -= 1;
        if (runner.paused === 0) {
          // Pick a fresh random direction once the pause ends — may repeat
          // the same direction or reverse, so movement never feels on a rail.
          runner.dir = Math.random() < 0.5 ? -1 : 1;
        }
      } else {
        runner.x += runner.dir * speed;
        runPhase += speed * 0.14;

        if (runner.x <= minX) {
          runner.x = minX;
          runner.dir = 1;
        } else if (runner.x >= maxX) {
          runner.x = maxX;
          runner.dir = -1;
        } else if (Math.random() < stopChance) {
          // Random stop at an arbitrary spot, not just at the edges.
          runner.paused = 40 + Math.random() * 90;
        }
      }

      draw();
      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [height, runnerColor, groundColor, stopChance]);

  return (
    <div style={{ width: '100%', height, position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
        aria-label="Animated Claude Code icon roaming back and forth"
        role="img"
      />
    </div>
  );
};

export default AutoRoamGame;