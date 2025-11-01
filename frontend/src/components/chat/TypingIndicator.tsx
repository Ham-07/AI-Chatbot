const TypingIndicator = () => {
  return (
    <div className="flex self-start gap-1 bg-gray-400 text-black rounded-2xl px-3 py-3 mb-1">
      <Dot />
      <Dot className="[animation-delay:0.2s]" />
      <Dot className="[animation-delay:0.4s]" />
    </div>
  );
};
type DotProps = {
  className?: string;
};

const Dot = ({ className }: DotProps) => (
  <div
    className={`w-2 h-2 rounded-full bg-gray-800 animate-pulse ${className}`}
  ></div>
);

export default TypingIndicator;
