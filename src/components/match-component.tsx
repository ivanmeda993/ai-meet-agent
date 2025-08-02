import { type JSX, type ReactNode } from 'react';

type ValueProp<T extends string | number | symbol> = {
  value: T;
};
type MatchProps<T extends string | number | symbol> = Record<
  T,
  () => ReactNode | JSX.Element
> &
  ValueProp<T>;

export function MatchComponent<T extends string | number | symbol>(
  props: MatchProps<T>,
) {
  const render = props[props.value];

  return <>{render()}</>;
}
