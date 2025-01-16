const Footer = () => {
  return (
    <footer className="mt-20 border-t py-10 border-neutral-700">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h3 className="text-md font-semibold mb-4">
            {" "}
            All the copyright goes to{" "}
            <a
              href="https://www.prasoonsengar.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-orange-500"
            >
              Prasoon Sengar
            </a>
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
