export default function Footer() {
    const currentYear = new Date().getFullYear()
  
    return (
      <footer className="w-full bg-black text-gray-400 py-4 border-t border-gray-800">
        <div className="container mx-auto px-6 md:px-8 text-center md:text-right text-xs">
          <p>&copy; {currentYear} DylanZ.one All rights reserved.</p>
        </div>
      </footer>
    )
  }
  
  