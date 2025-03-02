import { FC } from "react";
import { DateTime } from "luxon";

export type Props = {
  /**
   * Date as an ISO string
   * @example
   * new Date().toISOString()
   */
  value?: string;
  /**
   * Set the width of a column in pixels
   * @example
   * { header: props => <Cell columnWidth={props.column.getSize()} /> }
   */
  columnWidth?: number;
};

/**
 * Provide a string with a BCP 47 language tag or an Intl.Locale instance,
 * or an array of such locale identifiers.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#locales
 */
const LOCALE = "en-US";

export const DateCell: FC<Props> = ({ value, columnWidth }) => {
  /**
   * Intl.DateTimeFormat is a standard browser built-in object
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
   */
  const date = DateTime.fromISO(value ?? "", { zone: "America/Mazatlan" });
  const formattedValue = date.isValid
    ? date.setLocale(LOCALE).toLocaleString({
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div
      className="p-1 text-right"
      title={formattedValue}
      style={{ width: columnWidth }}
    >
      {formattedValue}
    </div>
  );
};
