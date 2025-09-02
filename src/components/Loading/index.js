import "./styles.css";

export default function Loading() {
  return (
    <div className="container-main-login">
      <svg
        width="182"
        height="52"
        viewBox="0 0 182 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="animated"
          d="M15 2H37C44.1797 2 50 7.8203 50 15V37C50 44.1797 44.1797 50 37 50H15C7.8203 50 2 44.1797 2 37V15L2.00391 14.6641C2.17925 7.75125 7.75125 2.17925 14.6641 2.00391L15 2Z"
          stroke="#3051FF"
          stroke-width="4"
        />

        <path
          class="animated"
          d="M41 15L21.75 37L13 27"
          stroke="#3051FF"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}
