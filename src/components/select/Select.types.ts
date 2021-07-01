
import { AriaSelectProps } from "@react-types/select";


export interface MomentumSelectProps<T> extends AriaSelectProps<T> {
  /**
  * className prop description
  */
  className?: string;
  /**
   * name of the select element
   */
  name?: string;
}
