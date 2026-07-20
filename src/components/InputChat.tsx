
function InputChat() {

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="flex items-center rounded-full bg-[#2f2f2f] border border-gray-700 pl-5 pr-2  shadow-lg">
        
            <input
          type="text"
          placeholder="Preguntar lo que quieras..."
          className="
            flex-1
            bg-transparent
            text-white
            placeholder:text-gray-400
            outline-none
            text-[15px]
            py-4
          "
        />

        <button
          className="
            ml-3
            h-10
            w-10
            rounded-full
            bg-white
            flex
            items-center
            justify-evenly
            hover:bg-gray-200
            transition
            cursor-pointer
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 9 16"
          >
            <path d="M0 0h9v16H0z" fill="none" />
            <path
              fill="#050505"
              d="M4.5 14c-.28 0-.5-.22-.5-.5v-9c0-.28.22-.5.5-.5s.5.22.5.5v9c0 .28-.22.5-.5.5"
            />
            <path
              fill="#050505"
              d="M8 7.5a.47.47 0 0 1-.35-.15L4.5 4.2L1.35 7.35c-.2.2-.51.2-.71 0s-.2-.51 0-.71l3.5-3.5c.2-.2.51-.2.71 0l3.5 3.5c.2.2.2.51 0 .71c-.1.1-.23.15-.35.15"
            />
          </svg>
        </button>

        </div>


    </div>
  );
}

export default InputChat;
