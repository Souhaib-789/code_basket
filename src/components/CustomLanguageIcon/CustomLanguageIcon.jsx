import React from "react";
import { BiLogoTypescript } from "react-icons/bi";
import { DiRuby } from "react-icons/di";
import { FaAngular, FaCss3Alt, FaFileCode, FaHtml5, FaJava, FaJs, FaNodeJs, FaPython, FaReact } from 'react-icons/fa';
import { FaC } from "react-icons/fa6";
import { SiExpress, SiPhp, SiSwift } from "react-icons/si";


export const CustomLanguageIcon = ({ language }) => {
    const color = "var(--secondary-color)";
    const size = 16;
    switch (language) {
        case "javascript":
            return <FaJs size={size} color={color} />
        case "java":
            return <FaJava size={size} color={color} />
        case "python":
            return <FaPython size={size} color={color} />

        case "c":
            return <FaC size={size} color={color} />

        case "php":
            return <SiPhp size={size} color={color} />

        case "ruby":
            return <DiRuby size={size} color={color} />

        case "swift":
            return <SiSwift size={size} color={color} />

        case "typescript":
            return <BiLogoTypescript size={size} color={color} />

        case "html":
            return <FaHtml5 size={size} color={color} />

        case "css":
            return <FaCss3Alt size={size} color={color} />

        case "react native":
            return <FaReact size={size} color={color} />

        case "react":
            return <FaReact size={size} color={color} />

        case "node":
            return <FaNodeJs size={size} color={color} />


        case "express":
            return <SiExpress size={size} color={color} />


        case "angular":
            return <FaAngular size={size} color={color} />


        default:
            return <FaFileCode size={size} color={color}/>

    }
};