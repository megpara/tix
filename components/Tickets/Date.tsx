import { event } from "../../pages/config";

type Props = {
  date: string;
  selectDate: (date: string) => void;
};

export default function Date({ date, selectDate }: Props) {
  return (
    <div className="mt-5">
      <div className="text-2xl font-bold">Pick a date</div>
      {event.dates.map((d) => {
        return (
          <div
            key={d}
            style={{ background: date === d ? "red" : "white" }}
            onClick={() => selectDate(d)}
            className="bg-white text-black text-2xl m-5 p-5 text-center font-bold border-white border-solid border-4"
          >
            {d}
          </div>
        );
      })}
    </div>
  );
}
