import gatsbyCover from "../assets/images/hero-gatsby.jpg";
import atomicHabitsCover from "../assets/images/hero-atomic-habits.jpg";
import ikigaiCover from "../assets/images/hero-ikigai.jpg";

const heroBooks = [
  {
    title: "The Great Gatsby",
    image: gatsbyCover,
    className: "hero-book-left w-[145px] top-[130px] left-[9%] -rotate-[15deg] z-[1] wide:top-[143px] wide:w-[157px] compact:w-[133px] compact:left-[4%] tablet:w-28 tablet:top-[121px] mobile:w-[99px] mobile:top-[67px] mobile:left-[calc(50%_-_147px)]",
  },
  {
    title: "Atomic Habits",
    image: atomicHabitsCover,
    className: "hero-book-center w-[158px] top-[98px] left-[34%] -rotate-[4deg] z-[3] wide:top-28 wide:w-[175px] compact:w-[133px] compact:left-[29%] tablet:w-[125px] tablet:top-[93px] tablet:left-[29%] mobile:w-[116px] mobile:top-[37px] mobile:left-[calc(50%_-_56px)]",
  },
  {
    title: "Ikigai",
    image: ikigaiCover,
    className: "hero-book-right w-[145px] top-[129px] left-[61%] rotate-[14deg] z-[2] wide:top-[143px] wide:w-[157px] compact:w-[133px] compact:left-[56%] tablet:w-28 tablet:top-[121px] tablet:left-[56%] mobile:w-[99px] mobile:top-[67px] mobile:left-[calc(50%_+_53px)]",
  },
];

export default function HeroBooks() {
  return (
    <div className="hero-books pointer-events-none absolute inset-0 select-none" aria-hidden="true">
      {heroBooks.map(({ title, image, className }) => (
        <img
          key={title}
          src={image}
          alt=""
          draggable={false}
          className={`hero-book absolute block aspect-[0.65] rounded-[2px] object-cover [filter:drop-shadow(8px_16px_11px_#22434c2f)] ${className}`}
        />
      ))}
    </div>
  );
}
