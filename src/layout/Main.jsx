const Main = ({children}) => (
  <>
    <header style={{
      margin: "0 auto",
      width: "40%",
      padding: "30px 0 0"
    }}>
    </header>

    {children}

    <footer style={{
      display: "flex",
      justifyContent: "center",
      height: 90,
      alignItems: "flex-start"
    }}>
    </footer>
  </>
);

export default Main;
