import { Card, CardFooter, Image, Pagination } from "@nextui-org/react";
import { IMidia, statusByMidia } from "../../data/midia";
import { imageModified, statusColorMap, textMidia } from "../../utils/utils";

interface GridMidiaProps {
    items: any[],
    page: number,
    pages: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setMidiaSelected: React.Dispatch<React.SetStateAction<IMidia>>,
    onOpen: any,
    pageTopRef: React.RefObject<HTMLDivElement>
}

export const GridMidiaComponent = ({
    items,
    pages,
    page,
    setPage,
    setMidiaSelected,
    onOpen,
    pageTopRef
}: GridMidiaProps) => {
    return (<>
        <div className="grid pt-4" >
            <div className="grid sm-app:grid-cols-2 sm-app:grid-cols-3 ml-app:grid-cols-4 lg-app:grid-cols-6 lg-app:grid-cols-10 xl-app:grid-cols-10 xl-app:grid-cols-12 gap-2">
                {items.map((item: any, index: number) => (
                    <Card
                        key={`${index}_card`}
                        isFooterBlurred
                        radius="lg"
                        className="border-none"
                        isPressable
                        onPress={() => {
                            setMidiaSelected(item);
                            onOpen();
                        }}>
                        <Image
                            removeWrapper
                            key={`image_modal_${item?.id}`}
                            className="z-0 w-full h-full object-cover"
                            width='180px'
                            height='280px'
                            src={imageModified(item?.img)}
                        />
                        {
                            statusColorMap[statusByMidia(item)] == 'success' &&
                            <div className="absolute bg-green-500 top-0 right-0 rounded-full p-3 m-2 shadow-sm w-6 h-6" />
                        }
                        <CardFooter className="justify-between py-1 absolute bottom-1 ml-1 z-10" style={{
                            background: 'linear-gradient(180deg,transparent,rgba(0,0,0,.8))'
                        }}>
                            <span style={{ color: 'rgb(255 255 255/var(--tw-text-opacity,1))', fontSize: '.875rem', fontWeight: 400 }}>
                                {item.year} ·  {textMidia(item.title)}
                            </span>
                        </CardFooter>
                    </Card>

                ))}
            </div>
            <div className="flex flex-cols w-full justify-center gap-4 py-2">
                <Pagination
                    isCompact
                    radius="full"
                    siblings={0}
                    showControls
                    showShadow
                    color="primary"
                    variant="light"
                    page={page}
                    total={pages}
                    onChange={(e) => {
                        setPage(e); 
                        pageTopRef.current?.scrollIntoView();
                    }}
                />
            </div>
        </div>
    </>)
}