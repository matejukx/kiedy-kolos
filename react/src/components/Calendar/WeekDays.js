import {motion} from "framer-motion";

const WeekDays = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    }
    const item = {
        hidden: { opacity: 0, x: -25 },
        show: { opacity: 1, x: 0 }
    }

    const calendarDays = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela']
        .map(day => {
            return <motion.li key={day} className="calendar__names-item" variants={item}>{day}</motion.li>
        });

    return (
        <div className="calendar__names">
            <motion.ul className="calendar__names-list" variants={container} initial="hidden" animate="show">
                {calendarDays}
            </motion.ul>
        </div>
    )
}

export default WeekDays;