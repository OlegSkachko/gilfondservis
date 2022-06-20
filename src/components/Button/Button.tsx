import React from 'react'
import './index.sass'


type classNameTypes = 'primary' | 'danger' | 'success' | 'warning'

interface IButton {
    loading?: boolean
    onClick?: () => void
    disabled?: boolean
    type?: classNameTypes
    min?: boolean
    max?: boolean
    block?: boolean
    outlined?: boolean
    text?: boolean
    children?: string | React.ReactElement
}

export default function Button({
    loading, onClick, disabled, type, min, max, block, outlined, text, children}:IButton) {
    if(type === undefined) type = 'primary'
    let buttonStyle = ''
    let divStyle = ''

    if(type === undefined) type = 'primary'
    buttonStyle = divStyle = type

    if(outlined) {
        divStyle += ' outlined'
        buttonStyle += ' outlined'
    }

    if(text) {
        divStyle += ' text'
        buttonStyle += ' text'
    }

    if(block) buttonStyle += ' block'
    if(min === true) {
        buttonStyle += ' min'
    } else if(max === true ){
        buttonStyle += ' max'
    }


  return (
    <div onClick={onClick} className={divStyle !== type ? divStyle : 'divStyle'}>
        <button disabled={disabled} className={buttonStyle}>
                {children}
                { loading && <div className='loading'/> }
        </button>
    </div>
  )
}

// 1) реализовать компонент кнопки.
// Компонент принимает в children (или slot vue) - текст и иконку

// у компонента должен быть доступны свойства:
//     - loading: boolean (появляется индикатор загрузки внутри кнопки)
//     - onClick: callback 
//     - disabled: boolean
//     - type: danger | success | warning | primary (default)
//     - min (модификатор для маленькой кнопки)
//     - large (модификатор для большой кнопки)
//     - block (модификатор для кнопки, которая растягивается по ширине контейнера )
//     - outlined (модификатор для стилизации кнопки, border в цвет модификатора type, фон прозрачный )
//     - text (фон кнопки становится прозрачным, но эффект наведения остается)

// пример можно посмотреть здесь https://vuetifyjs.com/en/components/buttons/
