import React from 'react';
import {Star} from '../../../shared/ui/star';

interface StaticRate {
    rate: number
}

export const StaticRate: React.FC<StaticRate> = ({ rate }) => {
    const starArray = [0, 1, 2, 3, 4];
    const transformNumberToPercent = (number: number) => number > 0 ? number : 0;
    return (
        <div>
            {starArray.map((number) => {
                const fill = transformNumberToPercent(rate - number);
                return <Star key={Math.random()} size={'xs'} fill={fill} />;
            })}
        </div>
    );
};