interface LeftPanelProps {
  title: string
  description: string
}

export default function LeftPanel({ title, description }: LeftPanelProps) {
  return (
    <div className="w-64 flex-shrink-0 md:w-1/4 bg-black p-6 md:p-8 md:min-h-screen md:fixed md:left-0">
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <div className="w-52 mx-auto md:mx-4 relative mb-6 place-content-center">
            <a href="/">
              <img src="/logo.svg" alt="张子澈 seal" className="w-24 mx-auto" />
            </a>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mx-4 mb-4 text-center md:text-left">{title}</h1>
          <p className="text-gray-300 text-center mx-4 md:text-left">{description}</p>
        </div>
      </div>
    </div>
  )
}

