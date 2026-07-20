const UnderlinedText = ({ text, offset = "4px" }) => {
  return (
    <span className="underline decoration-1 underline-offset-[4px]" style={{ textUnderlineOffset: offset }}>
      {text}
    </span>
  );
};

export default UnderlinedText;
