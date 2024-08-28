/* eslint-disable @typescript-eslint/no-unused-vars */


declare type EventsProps = {
    id:string,
    title: string,
    imageUrl: string,
    organizer: string,
    date: string,
    discount: string,
    price: string
}
declare interface EventProp{
    id:string,
    title: string,
    imageUrl: string,
    organizer: string,
    date: string,
    discount: string,
    price: string
    quantity ?: string | number
}

declare interface EventCardProps{
    event:EventsProps
}

declare type NavListProps = string[];

declare type EventPageDialogProps= {
  isOpen:boolean,
  event:EventProp,
  closeModule: ()=>void
}