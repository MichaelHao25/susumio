export default () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "14px",
          color: "red",
          border: "1px solid red",
          transform: "rotate(45deg)",
        }}
      >
        AGOTADO
      </div>
    </div>
  );
};
