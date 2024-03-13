import React from 'react';

const copyPath = 'M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z'
const donePath = 'M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z'

const Icon: React.FC<{ done: boolean }> = ({ done }) => (
  <svg
    className="copy-icon absolute left-0"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 256 256"
  >
    <path d={ done ? donePath : copyPath } />
  </svg>
);

const Button: React.FC<{ done: boolean }> = ({ done }) => (
  <div className="flex items-center bg-bg-000 border-0.5 border-border-300 shadow-sm rounded-lg  transition opacity-0 scale-95 group-hover:scale-100 group-hover:opacity-100">
    <div class="flex items-center bg-bg-000 border-0.5 border-border-300 shadow-sm rounded-lg  transition opacity-0 scale-95 group-hover:scale-100 group-hover:opacity-100">

          <button class="flex flex-row gap-1 items-center hover:bg-bg-200 rounded-md transition-opacity delay-100 text-xs">
            <div class="relative padding-left-4 bg-bg-100 rounded-md">
              <Icon done={done} />
            </div>
            Copy
          </button>
    </div>
  </div>
)

export default Button;
