import { concatMap, Observable, shareReplay, Subject } from "rxjs";

export const createSubjectObs = (
  handler: (...args: any[]) => Observable<any>
) => {
  const subject = new Subject();
  const subjectObs = subject.asObservable();
  const result = subjectObs.pipe(
    concatMap((...args: any[]) => handler(...args)),
    shareReplay(1)
  );
  return {
    next: subject.next.bind(subject),
    obs: result,
  };
};
