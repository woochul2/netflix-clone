function LinkIcon(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 5H6a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1v-4"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 9a1 1 0 102 0h-2zm1-5h1a1 1 0 00-1-1v1zm-5-1a1 1 0 100 2V3zm6 6V4h-2v5h2zm-1-6h-5v2h5V3z"
        fill="currentColor"
      />
      <path
        d="M12.293 10.293a1 1 0 001.414 1.414l-1.414-1.414zm8.414-5.586a1 1 0 00-1.414-1.414l1.414 1.414zm-7 7l7-7-1.414-1.414-7 7 1.414 1.414z"
        fill="currentColor"
      />
    </svg>
  );
}

export default LinkIcon;
