import React from 'react';
import { FaHospital, FaUserMd, FaAward } from 'react-icons/fa';
import styles from './Statistics.module.css';

interface StatItem {
  icon: React.ElementType;
  value: string;
  label: string;
}

const stats: StatItem[] = [
  {
    icon: FaHospital,
    value: '1399AH',
    label: 'Established in'
  },
  {
    icon: FaUserMd,
    value: '100+',
    label: 'Specialist Doctors'
  },
  {
    icon: FaAward,
    value: '24',
    label: 'Medical Departments'
  }
];

const Statistics: React.FC = () => {
  return (
    <section className={styles.statistics}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.iconWrapper}>
                <stat.icon className={styles.icon} />
              </div>
              <div className={styles.content}>
                <h3 className={styles.value}>{stat.value}</h3>
                <p className={styles.label}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
