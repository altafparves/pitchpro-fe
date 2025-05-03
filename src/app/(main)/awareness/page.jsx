
import XpChip from "../../components/XpChip";
import MenuButton from "@/app/components/Buttons/MenuButton";
export default function AwarenessPage() {
  

   const menuItems = [
     { id: 1, color: "#80CAEA", shadow: "#62A4C0", text: "Glossophobia" },
     { id: 2, color: "#C2EA80", shadow: "#96B85F", text: "Glossophobia" },
     { id: 3, color: "#EAB280", shadow: "#E29450", text: "Glossophobia" },
     { id: 4, color: "#BD8BF2", shadow: "#A35FEC", text: "Glossophobia" },
     { id: 5, color: "#EA8080", shadow: "#E25050", text: "Glossophobia" },
     { id: 6, color: "#7499DF", shadow: "#4477D4", text: "Glossophobia" },
   ];
  return (
    <>
      <div className="bg-neutral-50 w-full min-h-screen flex flex-col relative ">
        <div className="bg-neutral-50 h-[104px] flex items-end justify-end py-2 fixed w-full z-40 px-6">
                  <XpChip></XpChip>
        </div>
        <div className="w-full flex flex-col px-6 bg-neutral-50 pt-[120px] gap-8">
          <div className="w-full flex flex-col items-start gap-4 text-neutral-900">
            <p className="text-heading-h1 font-semibold">Anxiety Types</p>
            <p className="text-title font-[550]">Need to be known</p>
          </div>
          <div
            className="w-full menu grid grid-cols-2 gap-6
          justify-items-center items-center mx-auto"
          >
            {menuItems.map((item) => (
              <MenuButton key={item.id} color={item.color} shadowColor={item.shadow}>
                {item.text}
              </MenuButton>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}