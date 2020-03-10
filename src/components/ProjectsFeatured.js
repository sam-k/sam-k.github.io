import React from "react"
import ProjectCard from "./ProjectCard"
import Button from "./Button"

import data from "../data/projectsFeaturedData.json"
const projectsFeaturedData = data.projects

function renderText(text) {
    return text.map(line => <p dangerouslySetInnerHTML={{ __html: line }} />)
}

class Projects extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inIntro: props.inIntro
        }
    }

    render() {
        const projectsFeaturedItems = projectsFeaturedData.map(
            item => <ProjectCard
                title={item.title}
                subtitle={item.subtitle}
                text={renderText(item.text)}
                tools={item.tools}
                links={item.links}
                img={item.img}
            />
        )

        return (
            <div id='projects-featured'>
                <div id='projects-featured-wrapper'>
                    {!this.state.inIntro &&
                        <h2>Featured Projects</h2>
                    }
                    <div id='project-card-wrapper'>
                        {projectsFeaturedItems}
                        {(projectsFeaturedItems.length % 2 > 0) &&
                            <ProjectCard id='placeholder' />}
                    </div>

                    {this.state.inIntro &&
                        <Button
                            className='all-projects-button'
                            text="See All Projects"
                            link="#"

                            color="hsl(0, 0%, 27%)"
                            colorHover="rgb(0, 123, 255)"
                            bgColor="white"
                            bgColorHover="rgb(224, 236, 254)"
                            borderColor="hsl(0, 0%, 20%)"
                            borderColorHover="hsl(0, 0%, 20%)"
                        />
                    }
                </div>
            </div>
        )
    }
}

export default Projects