"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Result({ theme }: { theme: string }) {
  const [data, setData] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
      // fetch data from local storage
      const fetchData = async () => {
        const res = localStorage.getItem(theme);
        if (res) {
          const result = JSON.parse(res);
          setData(result);
          if (theme == "hmif") {
            const jsonData = await fetch("/ukmhmif.json");
            const descData = await jsonData.json();

            const hmifData = descData["hmif"]["texts"];
            let filteredData = [];
            for (let i = 0; i < result.length; i++) {
              for (let j = 0; j < hmifData.length; j++) {
                if (result[i].name == hmifData[j].text) {
                  filteredData.push(hmifData[j]);
                  break;
                }
              }
            }
            setData(filteredData);
          }
          else if (theme == "ukm") {
            const response = await fetch('/api/data/community/ukm');
            const descData = await response.json();

            const ukmData = descData["communities"];

            let filteredData = [];
            for (let i = 0; i < result.length; i++) {
              let found = false;
              for (let j = 0; j < ukmData.length; j++) {
                if (result[i].name == ukmData[j].name) {
                  found = true;
                  let neededData: { name: string, slug: string, image: string } = {
                    name: ukmData[j].name,
                    slug: ukmData[j].id,
                    image: ukmData[j].image
                  };

                  filteredData.push(neededData);
                  break;
                }
              } if (!found) {
                let neededData: { name: string, slug: string, image: string } = {
                  name: result[i].name,
                  slug: "",
                  image: "/logo_itb.png"
                };
                filteredData.push(neededData);
              }
            }
            setData(filteredData);

          }

          // continue with the rest of the code that uses descData
        } else {
          alert("Failed to get result\n\nPlease take the test first");
          router.push(`/${theme}/test/1`);
        }
      };
      fetchData();
    }, []);
  // theme can be 'ukm' or 'hmif', use it to choose color logic
  const color = theme === "ukm" ? "#457082" : "#306E43";
  const styles = {
    button: {
      display: "flex",
      alignItems: "center",
      padding: "2vh 4vh",
      cursor: "pointer",
    },
    backArrow: {
      fontSize: "4vh",
      marginRight: "2vh",
      fontWeight: "bold",
    },
    text: {
      fontSize: "3vh",
      fontWeight: "bold",
    },
    container: {
      textAlign: "center",
      marginTop: "-2vh",
    },
    title: {
      fontSize: "4vh",
      color: color,
      margin: "0",
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: "2vh",
      color: color,
      marginTop: "1vh",
      fontWeight: "bold",
    },
    containerresult: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "1vh 20vh",
      marginBottom: "2vh",
    },
    indexContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "6vh",
      height: "6vh",
      borderRadius: "50%",
      border: "5px solid " + color,
      marginRight: "1vh",
    },
    index: {
      fontSize: "4vh",
      color: color,
      fontWeight: "bold",
    },
    content: {
      display: "flex",
      alignItems: "center",
      flexGrow: 1,
      backgroundColor: color,
      borderRadius: "15px",
      padding: "2vh",
    },
    logo: {
      width: "6vh",
      height: "6vh",
      borderRadius: "50%",
      border: "2px solid #ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      fontSize: "2vh",
      marginRight: "2vh",
    },
    textContainer: {
      display: "flex",
      flexDirection: "column",
    },
    titleresult: {
      fontSize: "2vh",
      color: "#ffffff",
      marginBottom: "0.5vh",
    },
    link: {
      fontSize: "2vh",
      color: "#cce4ee",
      textDecoration: "none",
    },
  };
  return (
    <div>
      <button style={{ ...styles.button, color: color, borderColor: color }}>
        <div style={{ ...styles.backArrow, color: color }}>&lt;</div>
        <a href={`/${theme}/test/1`} style={styles.text}>
          Retake Test
        </a>
      </button>
      <div style={styles.container as React.CSSProperties}>
        <h1 style={styles.title}>Result</h1>
        <p style={styles.subtitle}>
          Here are the top 5 {theme == 'hmif' ? "departments" : "units"} that are the best match for you!
        </p>
      </div>
      {data.map((object: { name: any; text: any; slug: any; image: any }, index: number) => (
        <div key={index + 1} style={styles.containerresult}>
          <div style={styles.indexContainer}>
            <div style={styles.index}>{index + 1}</div>
          </div>
          <div style={styles.content}>
            <img src={object.image} style={styles.logo}></img>
            <div style={styles.textContainer as React.CSSProperties}>
              <div style={styles.titleresult}>{object.name || object.text}</div>
              <a href={`/${theme}/${object.slug}`} style={styles.link}>
                See more about {object.name || object.text}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
