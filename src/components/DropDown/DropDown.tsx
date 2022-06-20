import React, { useState, useEffect, useRef} from 'react'
import './index.sass'

type onClickType = () => void
type funcType = undefined | onClickType
type HTMLElementEvent<T extends HTMLElement> = Event & {
    target: T;
  }
interface IList {
    id?: string | number
    value: string
    onClick?: funcType | undefined
}

interface IDropDown {
    list?: IList[]
    children?: string | React.ReactElement
}

export default function DropDown({list, children}: IDropDown) {
    const rootEl = useRef<HTMLDivElement>(null);
    const [isList, setIsList] = useState<boolean>(false)
    if(list === undefined) list = []

    useEffect(() => {
        const onClick = (e: HTMLElementEvent<any>) => rootEl?.current?.contains(e.target) || setIsList(false)
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
        }, []);

    const onClose = () => setIsList(!isList)
    const listClickHandler = (func: funcType) => {
        if(func !== undefined) func()
        onClose()
    }


  return (
      <div ref={rootEl} onClick={onClose}>
        <button className='dropdown-button' onClick={onClose}> 
            {children}
        </button>
        <div className='dropdown-menu'>
            {isList && list.length >= 1 && list.map((el:IList, index)=> (
                <button className='dropdown-item'
                    key={el.id ?? index}
                    onClick={()=>listClickHandler(el.onClick)}
                >
                    {el.value}
                </button>
                ))
            }
        </div>
      </div>
  )
}

// 2) Реализуйте компонент выпадающего списка dropDown.
// пример можно посмотреть здесь https://vuetifyjs.com/en/components/menus/#usage
