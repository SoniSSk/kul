export default interface MenuItem {
    id:       string;
    title:    null;
    url:      string;
    target:   null;
    label:    string;
    parentId: null | string;
    children: MenuItem[];
    linkRelationship: null | string;
}
