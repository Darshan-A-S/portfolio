import { useEffect, useState } from "react";
import { format, eachDayOfInterval, subDays } from "date-fns";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
} from "@/components/contribution-graph";

const API_URL = "https://github-contributions-api.jogruber.de/v4/Darshan-A-S?y=last";

export function GitHubContributions({ className }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();

        const calendar = new Map(
          (json?.contributions ?? []).map((c) => [
            c.date,
            { count: c.count, level: c.level },
          ])
        );

        // Pad to a full year so the graph width stays stable and fills the
        // desktop container (no space on the right as new blocks are added).
        const today = new Date();
        const activities = eachDayOfInterval({ start: subDays(today, 364), end: today }).map(
          (day) => {
            const date = format(day, "yyyy-MM-dd");
            const entry = calendar.get(date);
            return entry ? { date, ...entry } : { date, count: 0, level: 0 };
          }
        );

        setData(activities);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch GitHub data", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
    <div id="github-contributions" className="scroll-m-[20vh] border-b border-[color:var(--color-border)] px-[8px] sm:px-0">
      <h2 className="border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-3 text-[26px] font-bold">
          GitHub
        </div>
      </h2>
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)]">
          <div className="flex h-40.5 w-full items-center justify-center">
            <Spinner className="text-muted-foreground" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="github-contributions" className="scroll-m-[20vh] border-b border-[color:var(--color-border)] px-[8px] sm:px-0">
      <h2 className="border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-3 text-[26px] font-bold">
          GitHub
        </div>
      </h2>
      <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)]">
        <div className="px-1 py-2">
          <ContributionGraph
            className={className}
            data={data}
            blockSize={11}
            blockMargin={3}
            blockRadius={2}
          >
            <ContributionGraphCalendar className="no-scrollbar px-2" title="GitHub Contributions">
              {({ activity, dayIndex, weekIndex }) => (
                <Tooltip>
                  <TooltipTrigger render={<g />}>
                    <ContributionGraphBlock activity={activity} dayIndex={dayIndex} weekIndex={weekIndex} />
                  </TooltipTrigger>
                  <TooltipContent className="font-sans">
                    <p>
                      {activity.count} contribution{activity.count > 1 ? "s" : null}{" "}
                      on {format(new Date(activity.date), "dd.MM.yyyy")}
                    </p>
                  </TooltipContent>
                </Tooltip>
              )}
            </ContributionGraphCalendar>

            <ContributionGraphFooter className="px-2">
              <div className="text-[13px] text-[var(--color-text-muted)]">
                <span className="font-semibold text-[var(--color-text)]">{data.reduce((s, a) => s + a.count, 0).toLocaleString("en")}</span> contributions in the past year on  {" "}
                <a
                  className="text-[var(--color-text)] underline decoration-current/30 underline-offset-3 transition-colors hover:decoration-current"
                  href="https://github.com/Darshan-A-S"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
              <ContributionGraphLegend />
            </ContributionGraphFooter>
          </ContributionGraph>
        </div>
      </div>
    </div>
  );
}
