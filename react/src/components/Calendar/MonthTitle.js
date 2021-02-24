import { motion } from 'framer-motion';

const MonthTitle = ({ month, swipeDirection }) => {
    const monthsWords = [
        'Styczeń',
        'Luty',
        'Marzec',
        'Kwiecień',
        'Maj',
        'Czerwiec',
        'Lipiec',
        'Sierpień',
        'Wrzesień',
        'Październik',
        'Listopad',
        'Grudzień',
    ];

    return (
        <motion.h2
            key={month}
            className='calendar__title'
            initial={{ x: swipeDirection * 50 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 600, damping: 50 }}
        >
            {monthsWords[month - 1]}
        </motion.h2>
    );
};

export default MonthTitle;
