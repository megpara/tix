import { event } from "../../lib/config";

type Props = {
  date: string;
  selectDate: (date: string) => void;
};

export default function Date({ date, selectDate }: Props) {
  return (
    <div className="mt-5">
      <div className="text-2xl font-bold">Pick a date</div>
      {/* <div className="py-4">All shows begin at 6pm</div> */}
      {event.dates.map((d) => {
        return (
          <div
            key={d}
            style={{ background: date === d ? "#6b7280" : "white" }}
            onClick={() => selectDate(d)}
            className="bg-white text-black text-xl m-5 p-4 text-center font-bold cursor-pointer w-full mx-0"
          >
            {d} | 6PM
          </div>
        );
      })}
    </div>
  );
}
