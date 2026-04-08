"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "@/lib/utils";

type SliderProps = SliderPrimitive.Root.Props & {
  className?: string;
};

function Slider({
                  className,
                  defaultValue,
                  value,
                  min = 0,
                  max = 100,
                  ...props
                }: SliderProps) {
  const values = React.useMemo(() => {
    if (Array.isArray(value) && value.length > 0) return value;
    if (Array.isArray(defaultValue) && defaultValue.length > 0) return defaultValue;
    return [min];
  }, [value, defaultValue, min]);

  return (
      <SliderPrimitive.Root
          data-slot="slider"
          value={value}
          defaultValue={defaultValue}
          min={min}
          max={max}
          className={cn("w-full", className)}
          {...props}
      >
        <SliderPrimitive.Control className="relative flex w-full touch-none select-none items-center data-disabled:opacity-50">
          <SliderPrimitive.Track
              data-slot="slider-track"
              className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800"
          >
            <SliderPrimitive.Indicator
                data-slot="slider-range"
                className="absolute h-full rounded-full bg-primary"
            />
          </SliderPrimitive.Track>

          {values.map((_, index) => (
              <SliderPrimitive.Thumb
                  key={index}
                  data-slot="slider-thumb"
                  className="block h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
              />
          ))}
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>
  );
}

export { Slider };