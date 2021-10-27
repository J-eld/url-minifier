import React from 'react'

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({}) => {
        return (
            <div className="p-3">
                <div className="container mx-auto font-bold text-xl">
                    Mini-URL
                </div>
            </div>
        );
}