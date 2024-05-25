'use client'

interface IFormInput {
    label: string
    type: string
    name: string
    placeholder: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    width?: string
}

export function FormInput({ label, type, name, placeholder, value, onChange, width }: IFormInput) {
    return (
        <div className="w-full flex flex-col gap-1">
            <label htmlFor={name} className="text-sm font-medium">
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}   
                onChange={onChange}
                className={`${width? width : 'w-full'} h-12 px-4 rounded bg-zinc-100`}
            />
        </div>
    )
}