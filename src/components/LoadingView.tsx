import type { Component } from "solid-js";

interface LoadingViewProps {
  message: string;
  isError?: boolean;
}

export const LoadingView: Component<LoadingViewProps> = (props) => {
  return (
    <div class="flex items-center justify-center w-screen h-screen bg-black">
      <div
        class="text-lg p-5 text-center font-sans"
        classList={{
          "text-white": !props.isError,
          "text-red-400": props.isError,
        }}
      >
        {props.message}
      </div>
    </div>
  );
};
