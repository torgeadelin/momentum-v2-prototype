import { ListState } from "@react-stately/list";
import { FocusStrategy } from "@react-types/shared";

export interface MomentumListBoxBaseProps<T> {
  state: ListState<T>;
  autoFocus?: boolean | FocusStrategy,
}
