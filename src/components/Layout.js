function Layout({ children }) {
  return (
    <div className="bg-black">
      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;