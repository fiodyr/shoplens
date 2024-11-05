// components/Footer.tsx
import React from 'react';
import styles from "./Footer.module.css";
import { footerData } from "../mockData.ts"; // импортируем мок-данные



export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
		<div className={styles.column}>
			<h4 className={styles.columnHeader}>
				<img 
					src="/images/sl_logo.png" 
					alt="eCommerce frontend"
					loading="lazy"
					width="250"
					height="85"
					/>			
			</h4>
			<div className={styles.infblock}>
				<a href={footerData.infoblock1.url} className={styles.infblockIcon}> 
				  <img
					src={footerData.infoblock1.png}
					alt={footerData.infoblock1.alt}
					loading={footerData.infoblock1.loading}
					width={footerData.infoblock1.width}
					height={footerData.infoblock1.height}
				  />
				</a>
				  {footerData.infoblock1.links.map((link, linkIndex) => (
					<React.Fragment key={linkIndex}>
					  <a href={link.url}>
						{link.name}
					  </a>
					  {linkIndex === 1 && <br />}
					 </React.Fragment>
				  ))}
			</div>
			<div className={styles.infblock}>
				<a href={footerData.infoblock2.url} className={styles.infblockIcon}> 
				  <img
					src={footerData.infoblock2.png}
					alt={footerData.infoblock2.alt}
					loading={footerData.infoblock2.loading}
					width={footerData.infoblock2.width}
					height={footerData.infoblock2.height}
				  />
				</a>
				  {footerData.infoblock2.links.map((link, linkIndex) => (
					  <a href={link.url} >
						  {link.name.map((line, index) => (
							<React.Fragment key={index}>
							  {line}
							  {index < link.name.length - 1 && <br />}
							</React.Fragment>
						  ))}
					  </a>
				  ))}
			</div>
			<div className={styles.infblockIcons}>
			  {footerData.infoblockIcons.map((link, linkIndex) => (
				<a href={link.url}> 
				  <img
					src={link.png}
					alt={link.alt}
					loading={link.loading}
					width={link.width}
					height={link.height}
				  />
				</a>
			  ))}
			</div>
		</div>
        {footerData.columns.map((column, index) => (
          <div key={index} className={styles.column}>
            <h4 className={styles.columnHeader}>{column.title}</h4>
            <ul className={styles.linkList}>
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href={link.url} className={styles.link}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}





