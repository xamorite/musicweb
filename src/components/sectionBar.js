const SectionBar = ({sectionName}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl lg:text-3xl font-bold">{sectionName}</h2>
      <button className="text-sm text-gray-400 hover:text-white">
        See More
      </button>
    </div>
  );
};

export default SectionBar;
