import { Card, ProgressCircle } from "@tremor/react";

export function ProgressCircleUsageExample() {
  return (
    <div className="flex justify-start flex-wrap  items-start gap-4">
      <div className=" ">
        <p className=" font-mono text-sm my-2 text-slate-500">
          Without children
        </p>
        <Card className="mx-auto max-w-sm">
          <div className="flex justify-start space-x-5 items-center">
            <ProgressCircle value={75} size="md" />
            <div>
              <p className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
                $340/$450 (75%)
              </p>
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Spend management control
              </p>
            </div>
          </div>
        </Card>
      </div>
      <div className=" ">
        <p className=" font-mono  my-2 text-sm text-slate-500">
          Progress value as children
        </p>
        <Card className="mx-auto max-w-sm">
          <div className="flex justify-start space-x-5 items-center">
            <ProgressCircle value={75} size="md">
              <span className="text-xs font-medium text-slate-700">75%</span>
            </ProgressCircle>
            <div>
              <p className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
                $340/$450 (75%)
              </p>
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Spend management control
              </p>
            </div>
          </div>
        </Card>
      </div>
      <div className=" ">
        <p className=" font-mono my-2 text-sm text-slate-500">
          Avatar as children
        </p>
        <Card className="mx-auto max-w-sm">
          <div className="flex justify-center space-x-5 items-center">
            <ProgressCircle value={75} size="md" color="indigo">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-500">
                SV
              </span>
            </ProgressCircle>
            <ProgressCircle value={75} size="md" color="violet">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-sm font-medium text-violet-500">
                CK
              </span>
            </ProgressCircle>
            <ProgressCircle value={75} size="md" color="fuchsia">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-fuchsia-100 text-sm font-medium text-fuchsia-500">
                AM
              </span>
            </ProgressCircle>
          </div>
        </Card>
      </div>
    </div>
  );
}
