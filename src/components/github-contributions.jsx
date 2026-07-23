import { useEffect, useState } from "react";
import { format } from "date-fns";
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

const USERNAME = "Darshan_as";
const API_URL = import.meta.env.DEV
  ? "/leetcode/graphql"
  : "/api/leetcode";

function getLevel(count) {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

export function LeetCodeContributions({ className }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query userProfileCalendar($username: String!) {
                matchedUser(username: $username) {
                  userCalendar {
                    submissionCalendar
                  }
                }
              }
            `,
            variables: { username: USERNAME },
          }),
        });

        const json = await res.json();
        const userCalendar = json?.data?.matchedUser?.userCalendar;

        if (!userCalendar) {
          setLoading(false);
          return;
        }

        const raw = JSON.parse(userCalendar.submissionCalendar);
        const activities = Object.entries(raw).map(([ts, count]) => {
          const date = new Date(Number(ts) * 1000);
          return {
            date: format(date, "yyyy-MM-dd"),
            count,
            level: getLevel(count),
          };
        });

        setData(activities);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch LeetCode data", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="border-b border-[color:var(--color-border)]">
        <h2 className="border-b border-[color:var(--color-border)]">
          <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-3 text-[26px] font-bold">
            LeetCode Contributions
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
    <div className="border-b border-[color:var(--color-border)] px-[8px] sm:px-0">
      <h2 className="border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-3 text-[26px] font-bold">
          LeetCode
        </div>
      </h2>
      <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)]">
        <div className="px-2 py-2">
          <ContributionGraph
            className={className}
            data={data}
            blockSize={11}
            blockMargin={3}
            blockRadius={2}
          >
            <ContributionGraphCalendar className="no-scrollbar px-2" title="LeetCode Contributions">
              {({ activity, dayIndex, weekIndex }) => (
                <Tooltip>
                  <TooltipTrigger render={<g />}>
                    <ContributionGraphBlock activity={activity} dayIndex={dayIndex} weekIndex={weekIndex} />
                  </TooltipTrigger>
                  <TooltipContent className="font-sans">
                    <p>
                      {activity.count} submission{activity.count > 1 ? "s" : null}{" "}
                      on {format(new Date(activity.date), "dd.MM.yyyy")}
                    </p>
                  </TooltipContent>
                </Tooltip>
              )}
            </ContributionGraphCalendar>

            <ContributionGraphFooter className="px-2">
              <div className="text-[13px] text-[var(--color-text-muted)]">
                <span className="font-semibold text-[var(--color-text)]">{data.reduce((s, a) => s + a.count, 0).toLocaleString("en")}</span> submissions in the past year on  {" "}
                <a
                  className="text-[var(--color-text)] underline decoration-current/30 underline-offset-3 transition-colors hover:decoration-current"
                  href="https://leetcode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LeetCode
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

export function LeetCodeContributionsFallback() {
  return (
    <div className="border-b border-[color:var(--color-border)] px-[8px] sm:px-0">
      <h2 className="border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-3 text-[26px] font-bold">
          LeetCode Contributions
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
