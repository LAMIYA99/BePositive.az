import { ReactNode } from "react";

export type children = {
  children: ReactNode;
};
export type headingTypes = {
  title?: string;
  desc?: string;
};

export type AccordionsProps = {
  title?: string;
  desc?: string;
};

export type MeetCardProps = {
  img: string;
  name: string;
  title: string;
};
export type TrainingCardProps = {
  tag: string;
  image: string;
  title: string;
};
