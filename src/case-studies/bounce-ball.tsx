export default function BounceBal() {
  return (
    <div className="center-container">
      <div className="hover:[&>div]:transform-[translateY(-20%)]">
        <div className="size-14 bg-yellow-500 rounded-full duration-200 ease-in transition-transform" />
      </div>
    </div>
  );
}
