"use client";
import { useState, useEffect } from 'react';
import styles from './Filter.module.css';
import { filterConfig, FilterSection } from '../mockData.ts';

export default function Filter({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ 
    min: filterConfig.priceConfig.min, 
    max: filterConfig.priceConfig.max 
  });
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    filterConfig.sections.reduce((acc, section) => ({
      ...acc,
      [section.id]: section.isExpanded || false
    }), {})
  );

  const formatPrice = (value: number) => Math.round(value);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        setVisible(true);
      });
    }
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const toggleColor = (colorId: string) => {
    setSelectedColors(prev =>
      prev.includes(colorId) ? prev.filter(id => id !== colorId) : [...prev, colorId]
    );
  };

  const toggleSize = (sizeId: string) => {
    setSelectedSizes(prev =>
      prev.includes(sizeId) ? prev.filter(id => id !== sizeId) : [...prev, sizeId]
    );
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    setPriceRange(prev => {
      const newValue = Math.max(
        filterConfig.priceConfig.min,
        Math.min(filterConfig.priceConfig.max, value)
      );

      if (type === 'min') {
        return {
          ...prev,
          min: Math.min(newValue, prev.max - 1),
        };
      } else {
        return {
          ...prev,
          max: Math.max(newValue, prev.min + 1),
        };
      }
    });
  };

  const handleApplyFilters = () => {
    console.log('Applied filters:', {
      colors: selectedColors,
      sizes: selectedSizes,
      priceRange,
    });
    handleClose();
  };

  if (!isOpen) return null;

  const renderSection = (section: FilterSection) => {
    const isExpanded = expandedSections[section.id];

    switch (section.type) {
      case 'color':
        return (
          <div className={`${styles.sectionContent} ${isExpanded ? styles.expanded : ''}`}>
            <div className={styles.colorGrid}>
              {filterConfig.colors.map(color => (
                <button
                  key={color.id}
                  className={`${styles.colorButton} ${selectedColors.includes(color.id) ? styles.selected : ''}`}
                  onClick={() => toggleColor(color.id)}
                  style={{ backgroundColor: color.color }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        );

      case 'size':
        return (
          <div className={`${styles.sectionContent} ${isExpanded ? styles.expanded : ''}`}>
            <div className={styles.sizeGrid}>
              {filterConfig.sizes.map(size => (
                <button
                  key={size.id}
                  className={`${styles.sizeButton} ${selectedSizes.includes(size.id) ? styles.selected : ''}`}
                  onClick={() => toggleSize(size.id)}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>
        );

      case 'price':
        return (
          <div className={`${styles.sectionContent} ${isExpanded ? styles.expanded : ''}`}>
            <div className={styles.priceRange}>
              <div
                className={styles.progress}
                style={{
                  left: `${((priceRange.min - filterConfig.priceConfig.min) / 
                    (filterConfig.priceConfig.max - filterConfig.priceConfig.min)) * 100}%`,
                  right: `${100 - ((priceRange.max - filterConfig.priceConfig.min) / 
                    (filterConfig.priceConfig.max - filterConfig.priceConfig.min)) * 100}%`,
                }}
              ></div>
            </div>
            <div className={styles.rangeInput}>
              <input
                type="range"
                className={styles.rangeMin}
                min={filterConfig.priceConfig.min}
                max={filterConfig.priceConfig.max}
                value={priceRange.min}
                onChange={e => handlePriceChange('min', parseInt(e.target.value))}
              />
              <input
                type="range"
                className={styles.rangeMax}
                min={filterConfig.priceConfig.min}
                max={filterConfig.priceConfig.max}
                value={priceRange.max}
                onChange={e => handlePriceChange('max', parseInt(e.target.value))}
              />
            </div>
            <div className={styles.priceInputs}>
              <input
                type="number"
                value={priceRange.min}
                onChange={e => handlePriceChange('min', Number(e.target.value))}
                placeholder="Min"
              />
              <span className={styles.spanBetwin}>-</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={e => handlePriceChange('max', Number(e.target.value))}
                placeholder="Max"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${visible ? styles.visible : ''}`}
        onClick={handleClose}
      />
      <div className={`${styles.filter} ${visible ? styles.visible : ''}`}>
        <div className={styles.filterHeader}>
          <h3>Filter</h3>
          <button onClick={handleClose} className={styles.closeButton}>
            ×
          </button>
        </div>

        <div className={styles.filterContent}>
          {filterConfig.sections.map(section => (
            <div key={section.id} className={styles.filterSection}>
              <button
                className={styles.sectionHeader}
                onClick={() => toggleSection(section.id)}
              >
                <span>{section.title}</span>
                <span className={`${styles.arrow} ${expandedSections[section.id] ? styles.expanded : ''}`}>
                  ▼
                </span>
              </button>
              {renderSection(section)}
            </div>
          ))}

          <button className={styles.applyButton} onClick={handleApplyFilters}>
            Show Results
          </button>
        </div>
      </div>
    </>
  );
}