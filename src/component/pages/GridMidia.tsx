import { Card, CardBody, CardFooter, Divider, Image, Pagination } from "@nextui-org/react";
import { IMidia } from "../../data/midia";
import { imageModified, textMidia } from "../../utils/utils";

interface GridMidiaProps {
    items: any[],
    page: number,
    pages: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setMidiaSelected: React.Dispatch<React.SetStateAction<IMidia>>,
    onOpen: any
}

export const GridMidiaComponent = ({
    items,
    pages,
    page,
    setPage,
    setMidiaSelected,
    onOpen
}: GridMidiaProps) => {
    return (<>
        <div className="grid pt-4" >
            <div className="grid sm-app:grid-cols-2 sm-app:grid-cols-3 ml-app:grid-cols-4 lg-app:grid-cols-6 lg-app:grid-cols-10 xl-app:grid-cols-10 xl-app:grid-cols-12 gap-2">
                {items.map((item: any, index: number) => (
                    <div key={`${index}_card`} className="p-1">
                        <Card
                            key={index}
                            isPressable
                            onPress={() => {
                                setMidiaSelected(item);
                                onOpen();
                            }} style={{ 'height': 310 }}>
                            <CardBody className="overflow-visible py-2 my-8" style={{ 'height': 240 }}>
                                <Image
                                    isBlurred
                                    isZoomed
                                    width={150}
                                    height={220}
                                    alt={item.title}
                                    src={imageModified(item.img)} />
                            </CardBody>
                            <Divider />
                            <CardFooter className="text-small">
                                <div className="flex flex-col justify-items-start">
                                    <span className="text-small text-inherit">{textMidia(item.title)}</span>
                                    <span className="text-tiny text-default-500">{textMidia(item.subtitle ?? item.publicationTitle ?? item.originalTitle)}</span>
                                    <span className=" text-tiny text-default-500">{item?.year}</span>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
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
                    onChange={setPage}
                />
            </div>
        </div>
    </>)
}