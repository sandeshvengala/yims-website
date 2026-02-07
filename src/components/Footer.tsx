export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white text-center py-6 mt-8 rounded-t-lg shadow-inner">
      <div className="max-w-7xl mx-auto px-4">© {new Date().getFullYear()} YIMS. All rights reserved.</div>
    </footer>
  );
}
