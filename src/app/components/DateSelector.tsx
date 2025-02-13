interface DateSelectorProps {
    dates: string[]
    selectedDate: string
    onDateSelect: (date: string) => void
  }
  
  export function DateSelector({ dates, selectedDate, onDateSelect }: DateSelectorProps) {
    return (
      <div className="flex space-x-4 mb-6">
        {dates.map((date) => (
          <button
            key={date}
            onClick={() => onDateSelect(date)}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              selectedDate === date ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {date}
          </button>
        ))}
      </div>
    )
  }
  
  