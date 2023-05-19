import React, { useState } from "react"

interface IProps {
  type: "sort" | "reverse-sort" | "star" | "bucket" | "close",
  size?: string,
  color?: string,
  hoveColor?: string,
  onClickHandler?: () => void,
  cursorPointer?: boolean
}

const SVG = ({ type, size = "20", color = "#001E00", hoveColor = "#001E00", onClickHandler, cursorPointer = false }: IProps) => {

  const [hoverStatus, setHoverStatus] = useState(false)
  const c = !hoverStatus ? color : hoveColor

  console.log('+++', type);

  if (type === "sort")
    return <svg
      onClick={onClickHandler}
      onMouseEnter={() => setHoverStatus(true)}
      onMouseLeave={() => setHoverStatus(false)}
      width={`${size}px`}
      height={`${size}px`}
      style={{
        cursor: cursorPointer ? "pointer" : ""
      }}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.00002 5C7.00002 4.44772 6.5523 4 6.00002 4C5.44773 4 5.00002 4.44772 5.00002 5V16.5858L3.7071 15.2929C3.31658 14.9024 2.68341 14.9024 2.29289 15.2929C1.90237 15.6834 1.90237 16.3166 2.2929 16.7071L5.29291 19.7071C5.48045 19.8946 5.73481 20 6.00002 20C6.26524 20 6.51959 19.8946 6.70713 19.7071L9.70711 16.7071C10.0976 16.3166 10.0976 15.6834 9.7071 15.2929C9.31658 14.9024 8.68341 14.9024 8.29289 15.2929L7.00002 16.5858V5ZM13 6C12.4477 6 12 6.44772 12 7C12 7.55228 12.4477 8 13 8H21C21.5523 8 22 7.55228 22 7C22 6.44772 21.5523 6 21 6H13ZM13 11C12.4477 11 12 11.4477 12 12C12 12.5523 12.4477 13 13 13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13ZM13 16C12.4477 16 12 16.4477 12 17C12 17.5523 12.4477 18 13 18H14C14.5523 18 15 17.5523 15 17C15 16.4477 14.5523 16 14 16H13Z"
        fill={c} />
    </svg>
  if (type === "reverse-sort")
    return <svg
      onClick={onClickHandler}
      onMouseEnter={() => setHoverStatus(true)}
      onMouseLeave={() => setHoverStatus(false)}
      width={`${size}px`}
      height={`${size}px`}
      style={{
        cursor: cursorPointer ? "pointer" : ""
      }}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.00002 5C7.00002 4.44772 6.5523 4 6.00002 4C5.44773 4 5.00002 4.44772 5.00002 5V16.5858L3.7071 15.2929C3.31658 14.9024 2.68341 14.9024 2.29289 15.2929C1.90237 15.6834 1.90237 16.3166 2.2929 16.7071L5.29291 19.7071C5.68344 20.0976 6.3166 20.0976 6.70713 19.7071L9.70713 16.7071C10.0977 16.3166 10.0977 15.6834 9.70713 15.2929C9.3166 14.9024 8.68344 14.9024 8.29291 15.2929L7.00002 16.5858V5ZM13 6C12.4477 6 12 6.44772 12 7C12 7.55228 12.4477 8 13 8H14C14.5523 8 15 7.55228 15 7C15 6.44772 14.5523 6 14 6H13ZM13 11C12.4477 11 12 11.4477 12 12C12 12.5523 12.4477 13 13 13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13ZM13 16C12.4477 16 12 16.4477 12 17C12 17.5523 12.4477 18 13 18H21C21.5523 18 22 17.5523 22 17C22 16.4477 21.5523 16 21 16H13Z"
        fill={c} />
    </svg>
  else if (type === "star")
    return <svg
      onClick={onClickHandler}
      onMouseEnter={() => setHoverStatus(true)}
      onMouseLeave={() => setHoverStatus(false)}
      width={`${size}px`}
      height={`${size}px`}
      style={{
        cursor: cursorPointer ? "pointer" : ""
      }}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_16_666)">
        <path
          d="M19.6247 7.41781C19.4778 6.98062 19.0994 6.66187 18.6438 6.59219L13.341 5.78188L10.9591 0.707813C10.756 0.275313 10.3219 0 9.84501 0C9.36783 0 8.93408 0.275313 8.73095 0.707813L6.34876 5.78219L1.04595 6.5925C0.590325 6.66219 0.211888 6.98063 0.0653253 7.41813C-0.0812372 7.85563 0.0293878 8.3375 0.351575 8.66813L4.22408 12.6391L3.30689 18.2569C3.23126 18.7219 3.42845 19.1894 3.81314 19.4613C4.19751 19.7331 4.70501 19.7606 5.11845 19.5325L9.84533 16.9184L14.5722 19.5325C14.7588 19.6356 14.9641 19.6862 15.1685 19.6862C15.4172 19.6862 15.666 19.6106 15.8775 19.4613C16.2622 19.1897 16.4591 18.7222 16.3834 18.2569L15.4663 12.6391L19.3391 8.66813C19.6606 8.3375 19.7713 7.85562 19.6247 7.41781Z"
          fill={c} />
      </g>
      <defs>
        <clipPath id="clip0_16_666">
          <rect width={size} height={size} />
        </clipPath>
      </defs>
    </svg>

  else if (type === "bucket")
    return <svg
      onClick={onClickHandler}
      width={`${size}px`}
      height={`${size}px`}
      style={{
        cursor: cursorPointer ? "pointer" : ""
      }}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.25 2.5C6.25 1.11929 7.36929 0 8.75 0H11.25C12.6307 0 13.75 1.11929 13.75 2.5V3.75H17.5C18.1904 3.75 18.75 4.30965 18.75 5C18.75 5.69035 18.1904 6.25 17.5 6.25H17.3078L16.4275 17.6917C16.3274 18.9943 15.2412 20 13.9349 20H6.06507C4.75874 20 3.67264 18.9943 3.57244 17.6917L2.69231 6.25H2.5C1.80965 6.25 1.25 5.69035 1.25 5C1.25 4.30965 1.80965 3.75 2.5 3.75H6.25V2.5ZM8.75 3.75H11.25V2.5H8.75V3.75ZM5.19969 6.25L6.06507 17.5H13.9349L14.8003 6.25H5.19969Z"
        fill={c} />
    </svg>

  else if (type === "close")
    return <svg
      onClick={onClickHandler}
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 48 48"
      style={{
        cursor: cursorPointer ? "pointer" : ""
      }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" fill="white" fillOpacity="0.01" />
      <path d="M8 8L40 40" stroke={c} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 40L40 8" stroke={c} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg >

  else
    return null

}

export default SVG