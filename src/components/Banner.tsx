interface Title {
    title: string;
}

const Banner = ({title}: Title) => (
    <h1>{title}</h1>
);

export default Banner;
