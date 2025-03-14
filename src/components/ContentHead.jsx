export default function ContentHead({ title }) {
  return (
    <div className="px-horizontal py-8">
      <h1 className="text-xl font-bold uppercase text-accent lg:text-3xl">
        {title}
      </h1>
    </div>
  );
}
