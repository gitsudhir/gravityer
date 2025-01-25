function FilterButton({ isActive, isDone, value, handleFilter }) {
  return (
    <button
      onClick={() => handleFilter(isDone)}
      style={{ background: isActive === true ? "green" : "" }}
    >
      {value}
    </button>
  );
}

export default FilterButton;
