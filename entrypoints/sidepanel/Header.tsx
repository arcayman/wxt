type HeaderProps = {
    route: 'home' | 'saved'
    onNavigate: (route: 'home' | 'saved') => void
}

export function Header({ route, onNavigate }: HeaderProps) {
    return (
        <header className="flex border-b border-gray-700">
            <button
                onClick={() => onNavigate('home')}
                className={`flex-1 py-2 text-sm ${route === 'home'
                        ? 'text-white border-b-2 border-blue-500'
                        : 'text-gray-400'
                    }`}
            >
                Home
            </button>

            <button
                onClick={() => onNavigate('saved')}
                className={`flex-1 py-2 text-sm ${route === 'saved'
                        ? 'text-white border-b-2 border-blue-500'
                        : 'text-gray-400'
                    }`}
            >
                Saved
            </button>
        </header>
    )
}
