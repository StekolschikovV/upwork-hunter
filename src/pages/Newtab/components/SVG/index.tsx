import React, { useState } from "react"

interface IProps {
  type: "sort" | "star" | "bucket" | "close",
  size?: string,
  color?: string,
  hoveColor?: string,
  onClickHandler?: () => void,
  cursorPointer?: boolean
}

const SVG = ({ type, size = "20", color = "#001E00", hoveColor = "#001E00", onClickHandler, cursorPointer = false }: IProps) => {

  const [hoverStatus, setHoverStatus] = useState(false)
  const c = !hoverStatus ? color : hoveColor

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
        d="M5.83334 4.66668C5.83334 4.20644 5.46024 3.83334 5.00001 3.83334C4.53976 3.83334 4.16667 4.20644 4.16667 4.66668V14.3215L3.08924 13.2441C2.76381 12.9187 2.23616 12.9187 1.91073 13.2441C1.5853 13.5695 1.5853 14.0972 1.91074 14.4226L4.41075 16.9226C4.73619 17.248 5.26382 17.248 5.58926 16.9226L8.08926 14.4226C8.41474 14.0972 8.41474 13.5695 8.08926 13.2441C7.76382 12.9187 7.23619 12.9187 6.91075 13.2441L5.83334 14.3215V4.66668ZM10.8333 5.50001C10.3731 5.50001 9.99999 5.87311 9.99999 6.33334C9.99999 6.79358 10.3731 7.16668 10.8333 7.16668H11.6667C12.1269 7.16668 12.5 6.79358 12.5 6.33334C12.5 5.87311 12.1269 5.50001 11.6667 5.50001H10.8333ZM10.8333 9.66668C10.3731 9.66668 9.99999 10.0398 9.99999 10.5C9.99999 10.9603 10.3731 11.3333 10.8333 11.3333H14.1667C14.6269 11.3333 15 10.9603 15 10.5C15 10.0398 14.6269 9.66668 14.1667 9.66668H10.8333ZM10.8333 13.8333C10.3731 13.8333 9.99999 14.2064 9.99999 14.6667C9.99999 15.1269 10.3731 15.5 10.8333 15.5H17.5C17.9602 15.5 18.3333 15.1269 18.3333 14.6667C18.3333 14.2064 17.9602 13.8333 17.5 13.8333H10.8333Z"
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